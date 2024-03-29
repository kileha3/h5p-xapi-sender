import { H5P as H5PStandalone} from 'h5p-standalone';
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
    const container = document.getElementById('h5p-container'),
        resPath = container.getAttribute('data-path') || '',
        options = {
            h5pJsonPath: container.getAttribute('data-workspace') || 'workspace',
            id: URL.parse(location.href, true).query.activity_id,
            frameJs: `${resPath}dist/frame.bundle.js`,
            frameCss: `${resPath}dist/styles/h5p.css`
        };
    await new H5PStandalone(container, options)
    H5P.externalDispatcher.on("xAPI", (event) => {
        H5PxApiSender.sendStatement(event)
    });
}

/**
 * Setting up LRS ready to be used by H5p
 */
H5PxApiSender.setupLrs = () => {
    var params = URL.parse(location.href, true).query;
    H5PxApiSender.params = params
    if (Object.keys(params).length > 1) {
        if (params.actor || params.group) {
            H5PxApiSender._actor = params.actor ? TinCan.Agent.fromJSON(params.actor) :
                TinCan.Group.fromJSON(params.group);
            H5PxApiSender._actor.objectType = params.actor ? "Agent" : "Group";
        }

        H5PxApiSender.lrs = new TinCan.LRS({
            "endpoint": params.endpoint,
            "auth": params.auth,
            "user": H5PxApiSender._actor,
            "allowFail": false
        });
    }
};

/**
 * Construct a context parent for statement 
 */
H5PxApiSender.handleContextParent = (parents) => {
    const mParent = []
    parents.forEach(parent => {
        mParent.push({
            ...parent,
            id: parent.id ? parent.id : H5PxApiSender.params.activity_id
        })
    })
    return mParent;
}

/** Sending statement to the provided endpoint */
H5PxApiSender.sendStatement = (event) => {
    if (H5PxApiSender.lrs && H5PxApiSender.params) {
        const h5pStatement = event.data.statement,
            activityId = H5PxApiSender.params.activity_id,
            hasContextActivity = h5pStatement.context && h5pStatement.context.contextActivities,
            hasParent = hasContextActivity && h5pStatement.context.contextActivities.parent,
            parent = hasParent ? h5pStatement.context.contextActivities.parent : {},
            contextActivities = hasContextActivity && hasParent ? {
                ...h5pStatement.context.contextActivities
            } : {},
            context = h5pStatement.context ? h5pStatement.context : {},
            mObject = h5pStatement.object,
            subIdKey = 'http://h5p.org/x-api/h5p-subContentId',
            hasSubId = mObject.definition && mObject.definition.extensions && mObject.definition.extensions[subIdKey],
            statement = {
                actor: H5PxApiSender._actor,
                verb: h5pStatement.verb,
                object: {
                    ...mObject,
                    id: hasSubId ? `${activityId}/${mObject.definition.extensions[subIdKey]}` : activityId
                },
                result: h5pStatement.result,
                context: {
                    ...context,
                    registration: H5PxApiSender.params.registration,
                    contextActivities: {
                        ...contextActivities,
                        parent: hasParent ?
                            H5PxApiSender.handleContextParent(parent) : activityId
                    }
                },
                timestamp: new Date().toISOString()
            },
            tinCanStatement = TinCan.Statement.fromJSON(JSON.stringify(statement));
        H5PxApiSender.lrs.saveStatement(tinCanStatement, {
            callback: (err, _) => {
                if (err != null) {
                    console.log(`Failed to save statement: ${err}`);
                } else {
                    console.log("Saved OK");
                }
            }
        });
    } else {
        console.log(`${JSON.stringify(event.data.statement.verb.display)} statement was received but LRS was not initialized due to insufficient query params`);
    }
};


//Listen for the document load ready and initialize H5PxApiSender
document.addEventListener("DOMContentLoaded", () => {
    H5PxApiSender.init()
});

window.H5PxApiSender = H5PxApiSender;