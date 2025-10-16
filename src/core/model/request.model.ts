import { UserModel } from './user.model';

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
}
