
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "My API Documentation",
      "version": "1.0.0",
      "description": "API documentation for authentication endpoints"
    },
    "paths": {
      "/auth": {
        "post": {
          "summary": "Authenticates a user",
          "tags": [
            "Authentication"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "username": {
                      "type": "string",
                      "example": "john_doe"
                    },
                    "password": {
                      "type": "string",
                      "example": "password123"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns authentication token and user data",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "token": {
                        "type": "string",
                        "example": "eyJhbGciOiJIUzI1NiIsIn..."
                      },
                      "user": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 1
                          },
                          "username": {
                            "type": "string",
                            "example": "john_doe"
                          },
                          "email": {
                            "type": "string",
                            "example": "oU7kW@example.com"
                          },
                          "isAdmin": {
                            "type": "boolean",
                            "example": false
                          },
                          "password": {
                            "type": "string",
                            "example": "password123"
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-03-20T12:00:00Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-03-20T12:00:00Z"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Wrong password"
            },
            "404": {
              "description": "User not found"
            },
            "500": {
              "description": "Error authenticating user"
            }
          }
        }
      },
      "/genres": {
        "get": {
          "summary": "Retrieves a list of genres",
          "tags": [
            "Genres"
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the list of genres",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "properties": {
                      "id": {
                        "type": "integer",
                        "example": 1
                      },
                      "name": {
                        "type": "string",
                        "example": "ACTION"
                      }
                    },
                    "example": [
                      {
                        "id": 1,
                        "name": "ACTION"
                      }
                    ]
                  }
                }
              }
            },
            "500": {
              "description": "Server error while fetching genres",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Error fetching genres, <error details>"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/shows": {
        "get": {
          "summary": "Retrieves a list of all shows",
          "tags": [
            "Shows"
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the list of shows",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "../entities/Show.ts#/components/schemas/Show"
                    }
                  },
                  "example": [
                    {
                      "id": 1,
                      "title": "Breaking Bad",
                      "description": "A high school chemistry teacher turned methamphetamine producer.",
                      "type": "TV_SERIES",
                      "episodes": 62,
                      "startDate": "2008-01-20",
                      "endDate": "2013-09-29",
                      "createdAt": "2024-03-20T12:00:00Z",
                      "updatedAt": "2024-03-20T12:00:00Z"
                    },
                    {
                      "id": 2,
                      "title": "The Dark Knight",
                      "description": "Batman must face the Joker in a one-on-one fight.",
                      "type": "MOVIE",
                      "episodes": 1,
                      "startDate": "2008-07-18",
                      "endDate": null,
                      "createdAt": "2024-03-20T12:00:00Z",
                      "updatedAt": "2024-03-20T12:00:00Z"
                    }
                  ]
                }
              }
            },
            "500": {
              "description": "Server error while fetching shows",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Error fetching shows, <error details>"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/shows/{id}": {
        "get": {
          "summary": "Retrieves a specific show by ID",
          "tags": [
            "Shows"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "integer"
              },
              "description": "The ID of the show to retrieve"
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the show",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "../entities/Show.ts#/components/schemas/Show"
                  },
                  "example": {
                    "id": 1,
                    "title": "Breaking Bad",
                    "description": "A high school chemistry teacher turned methamphetamine producer.",
                    "type": "TV_SERIES",
                    "episodes": 62,
                    "startDate": "2008-01-20",
                    "endDate": "2013-09-29",
                    "createdAt": "2024-03-20T12:00:00Z",
                    "updatedAt": "2024-03-20T12:00:00Z"
                  }
                }
              }
            },
            "400": {
              "description": "Server error while fetching show",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Error fetching show, <error details>"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Show not found",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Show not found"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Server error while creating show",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Internal server error"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "post": {
          "summary": "Creates a new show",
          "tags": [
            "Shows"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "../entities/Show.ts#/components/schemas/Show"
                },
                "example": {
                  "title": "Stranger Things",
                  "description": "A group of kids uncover a dark secret in their small town.",
                  "type": "TV_SERIES",
                  "episodes": 25,
                  "startDate": "2016-07-15",
                  "endDate": null,
                  "genres": [
                    "ACTION",
                    "ADVENTURE"
                  ]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfully created the show",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "../entities/Show.ts#/components/schemas/Show"
                  },
                  "example": {
                    "id": 3,
                    "title": "Stranger Things",
                    "description": "A group of kids uncover a dark secret in their small town.",
                    "type": "TV_SERIES",
                    "episodes": 25,
                    "startDate": "2016-07-15",
                    "endDate": null,
                    "createdAt": "2024-03-20T12:00:00Z",
                    "updatedAt": "2024-03-20T12:00:00Z",
                    "genres": [
                      "ACTION",
                      "ADVENTURE"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Invalid request, missing required fields",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Error creating show, <error details>"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Permission denied, not an admin",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Not an admin"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Server error while creating show",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Internal server error"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "put": {
          "summary": "Updates an existing show",
          "tags": [
            "Shows"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "../entities/Show.ts#/components/schemas/Show"
                },
                "example": {
                  "id": 3,
                  "title": "Stranger Things Season 2",
                  "description": "The kids continue to uncover mysteries in Hawkins.",
                  "type": "TV_SERIES",
                  "episodes": 9,
                  "startDate": "2017-10-27",
                  "endDate": null,
                  "genres": [
                    "ACTION",
                    "ADVENTURE"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successfully updated the show",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "../entities/Show.ts#/components/schemas/Show"
                  },
                  "example": {
                    "id": 3,
                    "title": "Stranger Things Season 2",
                    "description": "The kids continue to uncover mysteries in Hawkins.",
                    "type": "TV_SERIES",
                    "episodes": 9,
                    "startDate": "2017-10-27",
                    "endDate": null,
                    "createdAt": "2024-03-20T12:00:00Z",
                    "updatedAt": "2024-03-20T12:00:00Z",
                    "genres": [
                      "ACTION",
                      "ADVENTURE"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Error updating show",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Error updating show, <error details>"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Permission denied, not an admin",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Not an admin"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Show not found",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Show not found"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Server error while creating show",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Internal server error"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "delete": {
          "summary": "Deletes a show by ID",
          "tags": [
            "Shows"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "integer"
              },
              "description": "The ID of the show to delete"
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully deleted the show",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Show deleted"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Error deleting show",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Error deleting show, <error details>"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Permission denied, not an admin",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Not an admin"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Show not found",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Show not found"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/users": {
        "get": {
          "summary": "Retrieves a list of all users",
          "tags": [
            "Users"
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the list of users",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "integer",
                          "example": 1
                        },
                        "username": {
                          "type": "string",
                          "example": "john_doe"
                        },
                        "email": {
                          "type": "string",
                          "example": "oU7kW@example.com"
                        },
                        "isAdmin": {
                          "type": "boolean",
                          "example": false
                        },
                        "password": {
                          "type": "string",
                          "example": "password123"
                        },
                        "salt": {
                          "type": "string",
                          "example": "random_salt"
                        },
                        "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-03-20T12:00:00Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-03-20T12:00:00Z"
                        }
                      }
                    }
                  },
                  "example": [
                    {
                      "id": 1,
                      "username": "john_doe",
                      "email": "john.doe@example.com",
                      "isAdmin": false,
                      "password": "hashed_password",
                      "salt": "random_salt",
                      "createdAt": "2024-03-20T12:00:00Z",
                      "updatedAt": "2024-03-20T12:00:00Z"
                    },
                    {
                      "id": 2,
                      "username": "jane_doe",
                      "email": "jane.doe@example.com",
                      "isAdmin": true,
                      "password": "hashed_password",
                      "salt": "random_salt",
                      "createdAt": "2024-03-21T12:00:00Z",
                      "updatedAt": "2024-03-21T12:00:00Z"
                    }
                  ]
                }
              }
            },
            "500": {
              "description": "Server error while fetching users",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Error fetching users, <error details>"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "post": {
          "summary": "Creates a new user",
          "tags": [
            "Users"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "username": {
                      "type": "string",
                      "example": "john_doe"
                    },
                    "email": {
                      "type": "string",
                      "example": "john.doe@example.com"
                    },
                    "password": {
                      "type": "string",
                      "example": "password123"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfully created the user",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "username": {
                        "type": "string",
                        "example": "john_doe",
                        "description": "Unique username of the user"
                      },
                      "email": {
                        "type": "string",
                        "example": "john.doe@example.com",
                        "description": "Unique email of the user"
                      },
                      "password": {
                        "type": "string",
                        "example": "hashed_password",
                        "description": "Hashed password of the user"
                      },
                      "salt": {
                        "type": "string",
                        "example": "random_salt",
                        "description": "Salt used for password hashing"
                      }
                    },
                    "example": {
                      "username": "john_doe",
                      "email": "john.doe@example.com",
                      "password": "hashed_password",
                      "salt": "random_salt"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid request, missing username, email, or password",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Error creating user, <error details>"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Server error while creating user",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Error creating user, <error details>"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "Comment": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "description": "Auto-generated ID of the show"
            },
            "userId": {
              "type": "integer",
              "example": 10
            },
            "showId": {
              "type": "integer",
              "example": 100
            },
            "text": {
              "type": "string",
              "example": "Great show!"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time",
              "example": "2024-03-20T12:00:00Z"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time",
              "example": "2024-03-20T12:30:00Z"
            }
          }
        },
        "GenreType": {
          "type": "string",
          "enum": [
            "ACTION",
            "ADVENTURE",
            "AVANT_GARDE",
            "AWARD_WINNING",
            "COMEDY",
            "DRAMA",
            "FANTASY",
            "GOURMET",
            "HORROR",
            "MYSTERY",
            "ROMANCE",
            "SCI_FI",
            "SLICE_OF_LIFE",
            "SPORTS",
            "SUPERNATURAL",
            "SUSPENSE"
          ],
          "description": "Predefined genre types for shows."
        },
        "Genre": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "description": "Unique identifier for the genre."
            },
            "name": {
              "type": "string",
              "description": "Name of the genre."
            }
          },
          "required": [
            "id",
            "name"
          ]
        },
        "ShowType": {
          "type": "string",
          "enum": [
            "TV_SERIES",
            "MOVIE"
          ],
          "description": "Type of the show (TV series or movie)"
        },
        "Show": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "description": "Auto-generated ID of the show"
            },
            "title": {
              "type": "string",
              "description": "Title of the show"
            },
            "description": {
              "type": "string",
              "description": "Detailed description"
            },
            "type": {
              "type": "string",
              "enum": [
                "TV_SERIES",
                "MOVIE"
              ],
              "description": "Type of the show"
            },
            "episodes": {
              "type": "integer",
              "default": 1,
              "description": "Number of episodes"
            },
            "startDate": {
              "type": "string",
              "format": "date",
              "nullable": true
            },
            "endDate": {
              "type": "string",
              "format": "date",
              "nullable": true
            },
            "createdAt": {
              "type": "string",
              "format": "date"
            },
            "updatedAt": {
              "type": "string",
              "format": "date"
            },
            "genres": {
              "type": "array",
              "items": {
                "$ref": "../entities/Genre.ts#/components/schemas/Genre"
              }
            }
          }
        },
        "User": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "description": "Auto-generated ID of the user"
            },
            "username": {
              "type": "string",
              "description": "Unique username of the user"
            },
            "email": {
              "type": "string",
              "description": "Unique email of the user"
            },
            "isAdmin": {
              "type": "boolean",
              "default": false,
              "description": "Indicates if the user has admin privileges"
            },
            "password": {
              "type": "string",
              "description": "Hashed password of the user"
            },
            "salt": {
              "type": "string",
              "description": "Salt used for password hashing"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time",
              "description": "Timestamp when the user was created"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time",
              "description": "Timestamp when the user was last updated"
            }
          }
        },
        "Status": {
          "type": "string",
          "enum": [
            "WATCHING",
            "COMPLETED",
            "ON_HOLD",
            "DROPPED",
            "PLAN_TO_WATCH"
          ],
          "description": "The status of the user with the show"
        },
        "UserShow": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "description": "Auto-generated ID of the UserShow record"
            },
            "userId": {
              "type": "integer",
              "description": "The ID of the user associated with the show"
            },
            "showId": {
              "type": "integer",
              "description": "The ID of the show being tracked"
            },
            "status": {
              "type": "string",
              "enum": [
                "WATCHING",
                "COMPLETED",
                "ON_HOLD",
                "DROPPED",
                "PLAN_TO_WATCH"
              ],
              "default": "PLAN_TO_WATCH",
              "description": "The current status of the user with the show"
            },
            "progress": {
              "type": "integer",
              "default": 0,
              "description": "The progress made by the user in the show (e.g., episode number)"
            },
            "score": {
              "type": "integer",
              "default": 0,
              "description": "The score given by the user to the show"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time",
              "description": "The date and time when the UserShow record was created"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time",
              "description": "The date and time when the UserShow record was last updated"
            }
          }
        }
      }
    },
    "tags": []
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
