function getTags(concept) {
    return [{
        "concept": {
            'id': 'superRich'
        }, 
        'value': (concept === 'superRich')
    }, {
        "concept": {
            'id': 'rich'
        }, 
        'value': (concept === 'rich')
    }, {
        "concept": {
            'id': 'middleClass'
        }, 
        'value': (concept === 'middleClass')
    }, {
        "concept": {
            'id': 'poor'
        }, 
        'value': (concept === 'poor')
    }, {
        "concept": {
            'id': 'homeless'
        }, 
        'value': (concept === 'homeless')
    }];
}

module.exports = getTags;