export default async (path, store) => {
    let project, documentType, institute, documentName;

    const paths = path.split('/').slice(1);
    if (paths.length === 1) {
        [ project ] = paths;
    } else if (paths.length === 2) {
        [ project, documentType ] = paths;
    } else if (paths.length === 3) {
        [ project, documentType, institute ] = paths;
    } else {
        [ project, documentType, institute, documentName ] = paths;
    }

    project = project || 'cmip6';
    documentType = documentType || 'models';

    await store.dispatch('initialise', {
        documentName,
        documentType,
        institute,
        project,
    });
}
