figma.showUI(__html__, { width: 400, height: 400 });

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'create-tokens') {
        const tokens = JSON.parse(msg.json);
        const collectionName = msg.collectionName || 'Design Tokens';

        const collection = figma.variables.createVariableCollection(collectionName);
        const defaultModeId = collection.defaultModeId;

        for (const [name, value] of Object.entries(tokens)) {
            if (typeof value === 'string' && value.startsWith('#')) {
                const colorVariable = figma.variables.createVariable(name, collection.id, "COLOR");
                colorVariable.setValueForMode(defaultModeId, {
                    r: parseInt(value.slice(1, 3), 16) / 255,
                    g: parseInt(value.slice(3, 5), 16) / 255,
                    b: parseInt(value.slice(5, 7), 16) / 255,
                    a: 1
                });
            }
            // Add handling for other types of tokens here...
        }

        figma.ui.postMessage({ type: 'tokens-created' });
    }
};
// const collectionId = "VariableCollectionId:2:1093"; // Remplacez ceci par votre ID de collection
// const collection = figma.variables.getVariableCollectionById(collectionId);

// if (collection) {
//   const variableIds = collection.variableIds;
//   for (const id of variableIds) {
//     const variable = figma.variables.getVariableById(id);
//     console.log(variable);
//   }
// }