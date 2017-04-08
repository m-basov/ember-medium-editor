YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "MediumEditor"
    ],
    "modules": [
        "Usage",
        "ember-medium-editor"
    ],
    "allModules": [
        {
            "displayName": "ember-medium-editor",
            "name": "ember-medium-editor",
            "description": "Ember wrapper for `medium-editor` library.\n\nUsage:\n\n```handlebars\n{{medium-editor\n   model.text\n   options=(hash)\n   onChange=(action (mut model.text))}}\n```"
        },
        {
            "displayName": "Usage",
            "name": "Usage",
            "description": "## Installation\n\n```shell\nember install ember-medium-editor\n```\n\n## Usage\n\n```handlebars\n{{medium-editor\n   model.text\n   options=(hash)\n   onChange=(action (mut model.text))}}\n```"
        }
    ],
    "elements": []
} };
});