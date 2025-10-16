export namespace ResponseBaseApiModel {
  export interface Base {
    status: number;
    success: boolean;
    messages: any;
  }

  export interface ApiResponse<Entity> extends Base {
    result: Entity;
  }

  export interface ApiResponsePaginated<Entity> extends Base {
    result: {
      count: number;
      results: Entity[];
    };
  }

  export interface Error extends Base {
    result: null;
  }
}
