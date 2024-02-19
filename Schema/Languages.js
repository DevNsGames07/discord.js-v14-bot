const { model, Schema } = require('mongoose');
 
let languageSchema = new Schema({
    Guild: String,
    Language: String,
});
 
module.exports = model("LanguageGuild(OpenSourceBot)", languageSchema);