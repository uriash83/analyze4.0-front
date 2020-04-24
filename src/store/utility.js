export const updateObject = (oldObject , updatedProperties) => {
    return {
        ...oldObject, // all keys in oldObject are rep;aced by updateProperties
        ...updatedProperties
    }
}