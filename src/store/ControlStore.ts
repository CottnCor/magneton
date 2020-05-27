import { action, computed, observable } from 'mobx';

class ControlStore {
  @observable busy = false;
  @action
  setLoading(busy: boolean) {
    this.busy = busy;
    if (this.busy) {
      setTimeout(() => this.setLoading(false), 5000);
    }
  }
  @computed get loading() {
    return this.busy;
  }
  @observable view = viewEnum.points;
  @action
  setCurrent(view: number) {
    this.view = view;
    this.setLoading(true);
  }
  @computed get current() {
    return this.view;
  }
}

export enum viewEnum {
  points,
  lines,
  mesh_initial,
  mesh_repaired
}

export default ControlStore;
