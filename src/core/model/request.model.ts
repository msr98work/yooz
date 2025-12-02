import { UserModel } from './user.model';
import { WorkflowModel } from './workflow.model';

export namespace RequestModel {
  export interface Full {
    id: number;
    node: any;
    arrival_time: string;
    last_modify: string;
    owner: UserModel.Full;
    enable: true;
    request: {
      title: string;
      status: string;
      type: string;
      tracking_code: string;
      start_date: string;
      end_date: string;
      geometry: {
        type: string;
        coordinates: [number, number];
      };
    };
  }

  export interface State {
    id: number;
    title: string;
    supervisors: any[];
  }

  export type StateCreate = Pick<State, 'title'> & {
    supervisors: number[];
  };

  export interface Type {
    id: number;
    title: string;
    children: Type[];
    workflow: WorkflowModel.Full;
  }

  export type TypeCreate = Pick<Type, 'title'> & {
    parent: number;
    workflow: number;
  };
}
