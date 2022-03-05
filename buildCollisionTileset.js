var fs = require("fs")

// tiles properties
const tiles = [
    {
        "id": 0,
        "properties": [
            {
                "name": "collides",
                "type": "bool",
                "value": true
            }]
    },
    {
        "id": 1,
        "properties": [
            {
                "name": "collides",
                "type": "bool",
                "value": true
            }]
    },
    {
        "id": 2,
        "properties": [
            {
                "name": "collides",
                "type": "bool",
                "value": true
            },
            {
                "name": "breakableBlock",
                "type": "bool",
                "value": true
            }]
    },
    {
        "id": 3,
        "properties": [
        ]
    },
    {
        "id": 4,
        "properties": [
            {
                "name": "collides",
                "type": "bool",
                "value": true
            },
            {
                "name": "doorBlock",
                "type": "bool",
                "value": true
            }]
    },
    {
        "id": 5,
        "properties": [
            {
                "name": "spikeBlock",
                "type": "bool",
                "value": true
            }]
    },
    {
        "id": 6,
        "properties": [
            {
                "name": "saveBlock",
                "type": "bool",
                "value": true
            }]
    },
    {
        "id": 7,
        "properties": [
            {
                "name": "hiddenBlock",
                "type": "bool",
                "value": true
            }]
    },
    {
        "id": 8,
        "properties": [
            {
                "name": "collides",
                "type": "bool",
                "value": true
            },
            {
                "name": "waterBlock",
                "type": "bool",
                "value": true
            }]
    },
    {
        "id": 9,
        "properties": [
            {
                "name": "collides",
                "type": "bool",
                "value": true
            },
            {
                "name": "crumbleBlock",
                "type": "bool",
                "value": true
            }]
    },
    {
        "id": 10,
        "properties": [
            {
                "name": "collides",
                "type": "bool",
                "value": true
            },
            {
                "name": "crumbleBlock",
                "type": "bool",
                "value": true
            }]
    },
    {
        "id": 11,
        "properties": [
            {
                "name": "collides",
                "type": "bool",
                "value": true
            },
            {
                "name": "crumbleBlock",
                "type": "bool",
                "value": true
            }]
    },
    {
        "id": 12,
        "properties": [
            {
                "name": "collides",
                "type": "bool",
                "value": true
            },
            {
                "name": "crumbleBlock",
                "type": "bool",
                "value": true
            }]
    },
    {
        "id": 13,
        "properties": [
            {
                "name": "collides",
                "type": "bool",
                "value": true
            },
            {
                "name": "crumbleBlock",
                "type": "bool",
                "value": true
            }]
    },
    {
        "id": 14,
        "properties": [
            {
                "name": "collides",
                "type": "bool",
                "value": true
            },
            {
                "name": "crumbleBlock",
                "type": "bool",
                "value": true
            }]
    },
    {
        "id": 15,
        "properties": [
            {
                "name": "collides",
                "type": "bool",
                "value": true
            },
            {
                "name": "crumbleBlock",
                "type": "bool",
                "value": true
            }]
    }
];


//function for file input
function getFile (filename)
{
    var data = fs.readFileSync(filename, "ascii");
    return data;
}

//parsing json
for (let i = 1; i < 43; i++)
{
    var jsonString = [getFile(`./src/maps/map${i}.json`)];
    var jsonObj = JSON.parse(jsonString);

    jsonObj.tilesets.forEach(e =>
    {
        if (e.name === 'colliderTileset')
        {
            e.tiles = tiles;
        }
    });

    jsonData = JSON.stringify(jsonObj);
    fs.writeFileSync(`./src/maps/map${ i }.json`, jsonData);
}
