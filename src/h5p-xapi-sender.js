import {H5P } from 'h5p-standalone';
import TinCan from 'tincanjs';	
import URL from 'url';


const H5PxApiSender = {};

H5PxApiSender._actor = {};

H5PxApiSender.params = {};

H5PxApiSender.lrs = null;
/**
 * Initialize H5PxApiSender by setting up both H5P and TinCan LRS
 */
H5PxApiSender.init = async () => {
    H5PxApiSender.setupLrs();
    const options = {
        id: URL.parse(location.href, true).query.activity_id,
        frameJs: '../node_modules/h5p-standalone/dist/frame.bundle.js',
        frameCss: '../node_modules/h5p-standalone/dist/styles/h5p.css'
    },container = document.getElementById('h5p-container'),
    h5pStandAlone = await new H5P(container, container.getAttribute('data-workspace')|| 'workspace', options);
    h5pStandAlone.H5P.externalDispatcher.on('xAPI',  (event) => {
        H5PxApiSender.sendStatement(event)
    });
}

H5PxApiSender.setupLrs = () => {
    var params = URL.parse(location.href, true).query;
    H5PxApiSender.params = params
    if(Object.keys(params).length > 1){
      if(params.actor || params.group) {
        H5PxApiSender._actor = params.actor ? TinCan.Agent.fromJSON(params.actor):
         TinCan.Group.fromJSON(params.group);
        H5PxApiSender._actor.objectType = params.actor ? "Agent":"Group";
      }
  
      H5PxApiSender.lrs = new TinCan.LRS({
          "endpoint": params.endpoint,
          "auth": params.auth,
          "user": H5PxApiSender._actor,
          "allowFail" : false
      });
    }
};

H5PxApiSender.handleContextParent = (parents) => {
    const mParent = []
    parents.forEach(parent => {
        mParent.push({...parent,id: parent.id ? parent.id : H5PxApiSender.params.activity_id})
    })
    return mParent;
}

/** Sending statement to the provided endpoint */
H5PxApiSender.sendStatement = (event) => {
    if(H5PxApiSender.lrs && H5PxApiSender.params){
        const h5pStatement = event.data.statement, activityId = H5PxApiSender.params.activity_id,
        parent = h5pStatement.context.contextActivities.parent, mObject = h5pStatement.object,
        subIdKey = 'http://h5p.org/x-api/h5p-subContentId',hasSubId = mObject.definition 
        && mObject.definition.extensions && mObject.definition.extensions[subIdKey],
        statement = {
            actor: H5PxApiSender._actor,
            verb: h5pStatement.verb,
            object: {...mObject, id: hasSubId ? `${activityId}/${mObject.definition.extensions[subIdKey]}`:activityId},
            result: h5pStatement.result,
            context: {...h5pStatement.context, registration: H5PxApiSender.params.registration,
                 contextActivities: 'parent' in h5pStatement.context.contextActivities ? 
                 {...h5pStatement.context.contextActivities, parent: parent ?
                     H5PxApiSender.handleContextParent(parent): activityId}: 
                 {...h5pStatement.context.contextActivities}},
            timestamp: new Date().toISOString()
        },tinCanStatement = TinCan.Statement.fromJSON(JSON.stringify(statement));
        H5PxApiSender.lrs.saveStatement(tinCanStatement, {
            callback: (err,xhr) => {
                if(err != null) {
                     console.log("Failed to save statement: " + err);
                }else {
                     console.log("Saved OK");
                }
            }
          });
    }else{
        console.log(`${JSON.stringify(event.data.statement.verb.display)} statement was received but LRS was not initialized due to insufficient query params`);
    }
};


//Listen for the document load ready and initialize H5PxApiSender
document.addEventListener("DOMContentLoaded", () => { 
    H5PxApiSender.init()
});

window.H5PxApiSender = H5PxApiSender;