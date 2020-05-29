import { action, computed, observable } from 'mobx';

class ControlStore {
  @observable busy = false;
  @observable view = viewEnum.points_initial;
  @action
  setLoading(busy: boolean) {
    this.busy = busy;
    if (this.busy) {
      setTimeout(() => this.setLoading(false), 3000);
    }
  }
  @computed get loading() {
    return this.busy;
  }
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
  points_initial,
  points_repaired,
  lines_initial,
  lines_repaired,
  mesh_initial,
  mesh_repaired
}

export default ControlStore;
