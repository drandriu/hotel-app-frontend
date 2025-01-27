export interface DynamicSearchDTO {
    listSearchCriteria: SearchCriteria[];
    listOrderCriteria: OrderCriteria[];
    page: PageRequest;
  }
  
  export interface SearchCriteria {
    key: string;
    value: string;
    operation: string;  // 'equals', 'lower', 'higher', etc.
  }
  
  export interface OrderCriteria {
    sortBy: string;
    valuesortOrder: string;  // 'ASC', 'DESC'
  }
  
  export interface PageRequest {
    pageIndex: number;
    pageSize: number;
  }
  