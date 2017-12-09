import editorHtml from 'ui/agg_types/controls/script_lang.html';
import { StringParamTypeProvider } from 'ui/agg_types/param_types/string';
import { GetEnabledScriptingLanguagesProvider } from 'ui/scripting_languages';

export function ScriptingLangParamTypeProvider(Private) {
  const StringParamType = Private(StringParamTypeProvider);
  const getScriptingLangs = Private(GetEnabledScriptingLanguagesProvider);

  class ScriptingLangParamType extends StringParamType {
    constructor(config) {
      super(config);

      this.default = 'painless';
      this.editor = editorHtml;
      this.controller = class ScriptingLangParamController {
        constructor() {
          this.loading = true;

          getScriptingLangs()
            .then(scriptingLangs => {
              this.loading = false;
              this.scriptingLangs = scriptingLangs;
            });
        }
      };
    }
  }

  return ScriptingLangParamType;
}
