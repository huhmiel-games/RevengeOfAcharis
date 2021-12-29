var fs = require("fs")

// tiles properties
const tiles = [
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 0
            },
            {
                "duration": 200,
                "tileid": 1
            },
            {
                "duration": 200,
                "tileid": 2
            },
            {
                "duration": 200,
                "tileid": 3
            }
        ],
        "id": 0
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 5
            },
            {
                "duration": 200,
                "tileid": 6
            },
            {
                "duration": 200,
                "tileid": 7
            },
            {
                "duration": 200,
                "tileid": 8
            }
        ],
        "id": 5
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 32
            },
            {
                "duration": 200,
                "tileid": 33
            },
            {
                "duration": 200,
                "tileid": 34
            },
            {
                "duration": 200,
                "tileid": 35
            }
        ],
        "id": 32
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 37
            },
            {
                "duration": 200,
                "tileid": 38
            },
            {
                "duration": 200,
                "tileid": 39
            },
            {
                "duration": 200,
                "tileid": 40
            }
        ],
        "id": 37
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 64
            },
            {
                "duration": 200,
                "tileid": 65
            },
            {
                "duration": 200,
                "tileid": 66
            }
        ],
        "id": 64
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 96
            },
            {
                "duration": 200,
                "tileid": 97
            },
            {
                "duration": 200,
                "tileid": 98
            }
        ],
        "id": 96
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 100
            },
            {
                "duration": 200,
                "tileid": 102
            },
            {
                "duration": 200,
                "tileid": 104
            }
        ],
        "id": 100
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 101
            },
            {
                "duration": 200,
                "tileid": 103
            },
            {
                "duration": 200,
                "tileid": 105
            }
        ],
        "id": 101
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 106
            },
            {
                "duration": 200,
                "tileid": 108
            },
            {
                "duration": 200,
                "tileid": 110
            }
        ],
        "id": 106
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 128
            },
            {
                "duration": 200,
                "tileid": 129
            },
            {
                "duration": 200,
                "tileid": 130
            }
        ],
        "id": 128
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 160
            },
            {
                "duration": 200,
                "tileid": 161
            },
            {
                "duration": 200,
                "tileid": 162
            }
        ],
        "id": 160
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 192
            },
            {
                "duration": 200,
                "tileid": 193
            },
            {
                "duration": 200,
                "tileid": 194
            }
        ],
        "id": 192
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 257
            },
            {
                "duration": 200,
                "tileid": 261
            },
            {
                "duration": 200,
                "tileid": 265
            },
            {
                "duration": 200,
                "tileid": 269
            },
            {
                "duration": 200,
                "tileid": 273
            }],
        "id": 257
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 290
            },
            {
                "duration": 200,
                "tileid": 294
            },
            {
                "duration": 200,
                "tileid": 298
            },
            {
                "duration": 200,
                "tileid": 302
            },
            {
                "duration": 200,
                "tileid": 306
            }
        ],
        "id": 290
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 320
            },
            {
                "duration": 200,
                "tileid": 324
            },
            {
                "duration": 200,
                "tileid": 328
            },
            {
                "duration": 200,
                "tileid": 332
            },
            {
                "duration": 200,
                "tileid": 336
            }
        ],
        "id": 320
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 321
            },
            {
                "duration": 200,
                "tileid": 325
            },
            {
                "duration": 200,
                "tileid": 329
            },
            {
                "duration": 200,
                "tileid": 333
            },
            {
                "duration": 200,
                "tileid": 337
            }
        ],
        "id": 321
    },
    {
        "animation": [
            {
                "duration": 200,
                "tileid": 323
            },
            {
                "duration": 200,
                "tileid": 327
            },
            {
                "duration": 200,
                "tileid": 331
            },
            {
                "duration": 200,
                "tileid": 335
            },
            {
                "duration": 200,
                "tileid": 339
            }
        ],
        "id": 323
    }
]

const tileData = {
    "0": {
        "animation": [
            {
                "duration": 200,
                "tileid": 0
            },
            {
                "duration": 200,
                "tileid": 1
            },
            {
                "duration": 200,
                "tileid": 2
            },
            {
                "duration": 200,
                "tileid": 3
            }
        ]
    },
    "5": {
        "animation": [
            {
                "duration": 200,
                "tileid": 5
            },
            {
                "duration": 200,
                "tileid": 6
            },
            {
                "duration": 200,
                "tileid": 7
            },
            {
                "duration": 200,
                "tileid": 8
            }
        ]
    },
    "32": {
        "animation": [
            {
                "duration": 200,
                "tileid": 32
            },
            {
                "duration": 200,
                "tileid": 33
            },
            {
                "duration": 200,
                "tileid": 34
            },
            {
                "duration": 200,
                "tileid": 35
            }
        ]
    },
    "37": {
        "animation": [
            {
                "duration": 200,
                "tileid": 37
            },
            {
                "duration": 200,
                "tileid": 38
            },
            {
                "duration": 200,
                "tileid": 39
            },
            {
                "duration": 200,
                "tileid": 40
            }
        ]
    },
    "64": {
        "animation": [
            {
                "duration": 200,
                "tileid": 64
            },
            {
                "duration": 200,
                "tileid": 65
            },
            {
                "duration": 200,
                "tileid": 66
            }
        ]
    },
    "96": {
        "animation": [
            {
                "duration": 200,
                "tileid": 96
            },
            {
                "duration": 200,
                "tileid": 97
            },
            {
                "duration": 200,
                "tileid": 98
            }
        ]
    },
    "100": {
        "animation": [
            {
                "duration": 200,
                "tileid": 100
            },
            {
                "duration": 200,
                "tileid": 102
            },
            {
                "duration": 200,
                "tileid": 104
            }
        ]
    },
    "101": {
        "animation": [
            {
                "duration": 200,
                "tileid": 101
            },
            {
                "duration": 200,
                "tileid": 103
            },
            {
                "duration": 200,
                "tileid": 105
            }
        ]
    },
    "106": {
        "animation": [
            {
                "duration": 200,
                "tileid": 106
            },
            {
                "duration": 200,
                "tileid": 108
            },
            {
                "duration": 200,
                "tileid": 110
            }
        ]
    },
    "128": {
        "animation": [
            {
                "duration": 200,
                "tileid": 128
            },
            {
                "duration": 200,
                "tileid": 129
            },
            {
                "duration": 200,
                "tileid": 130
            }
        ]
    },
    "160": {
        "animation": [
            {
                "duration": 200,
                "tileid": 160
            },
            {
                "duration": 200,
                "tileid": 161
            },
            {
                "duration": 200,
                "tileid": 162
            }
        ]
    },
    "192": {
        "animation": [
            {
                "duration": 200,
                "tileid": 192
            },
            {
                "duration": 200,
                "tileid": 193
            },
            {
                "duration": 200,
                "tileid": 194
            }
        ]
    },
    "257": {
        "animation": [
            {
                "duration": 200,
                "tileid": 257
            },
            {
                "duration": 200,
                "tileid": 261
            },
            {
                "duration": 200,
                "tileid": 265
            },
            {
                "duration": 200,
                "tileid": 269
            },
            {
                "duration": 200,
                "tileid": 273
            }]
    },
    "290": {
        "animation": [
            {
                "duration": 200,
                "tileid": 290
            },
            {
                "duration": 200,
                "tileid": 294
            },
            {
                "duration": 200,
                "tileid": 298
            },
            {
                "duration": 200,
                "tileid": 302
            },
            {
                "duration": 200,
                "tileid": 306
            }
        ]
    },
    "320": {
        "animation": [
            {
                "duration": 200,
                "tileid": 320
            },
            {
                "duration": 200,
                "tileid": 324
            },
            {
                "duration": 200,
                "tileid": 328
            },
            {
                "duration": 200,
                "tileid": 332
            },
            {
                "duration": 200,
                "tileid": 336
            }
        ]
    },
    "321": {
        "animation": [
            {
                "duration": 200,
                "tileid": 321
            },
            {
                "duration": 200,
                "tileid": 325
            },
            {
                "duration": 200,
                "tileid": 329
            },
            {
                "duration": 200,
                "tileid": 333
            },
            {
                "duration": 200,
                "tileid": 337
            }
        ]
    },
    "323": {
        "animation": [
            {
                "duration": 200,
                "tileid": 323
            },
            {
                "duration": 200,
                "tileid": 327
            },
            {
                "duration": 200,
                "tileid": 331
            },
            {
                "duration": 200,
                "tileid": 335
            },
            {
                "duration": 200,
                "tileid": 339
            }
        ]
    }
}

//function for file input
function getFile (filename)
{
    var data = fs.readFileSync(filename, "ascii");
    return data;
}

//parsing json
for (let i = 1; i < 35; i++)
{
    var jsonString = [getFile(`./src/maps/map${ i }.json`)];
    var jsonObj = JSON.parse(jsonString);

    jsonObj.tilesets.forEach(e =>
    {
        if (e.name === 'animated')
        {
            e.tiles = tiles;
            e.tileData = tileData;
        }
    });

    jsonData = JSON.stringify(jsonObj);
    fs.writeFileSync(`./src/maps/map${ i }.json`, jsonData);
}
