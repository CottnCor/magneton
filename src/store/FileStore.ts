import { action, computed, observable } from 'mobx';

class FileContent {
  @observable content = '';
  @action
  set(content: string) {
    this.content = content;
  }
  @action
  clear() {
    this.content = '';
  }
  @computed get hasContent() {
    return this.content ? true : false;
  }
}

export default FileContent;
