import _ from 'lodash';
import editorHtml from 'ui/agg_types/controls/script_lang.html';
import { AggTypesParamTypesStringProvider } from 'ui/agg_types/param_types/string';
import { GetEnabledScriptingLanguagesProvider, getSupportedScriptingLanguages } from 'ui/scripting_languages';

export function AggTypesParamTypesScriptingLangProvider(Private) {
  const StringAggParam = Private(AggTypesParamTypesStringProvider);
  const getEnabledScriptingLanguages = Private(GetEnabledScriptingLanguagesProvider);

  class ScriptingLangAggParam extends StringAggParam {
    constructor(config) {
      super(config);

      this.default = 'painless';
      this.editor = editorHtml;
      this.controller = class ScriptingLangParamController {
        constructor() {
          this.loading = true;

          getEnabledScriptingLanguages()
            .then(enabledLanguages => {
              this.loading = false;
              this.scriptingLangs = _.intersection(enabledLanguages, getSupportedScriptingLanguages());
            });
        }
      };
    }

  }

  return ScriptingLangAggParam;
}
