const schema = {
    properties: {
      body: {
        type: 'object',
        properties: {
          OrderId: {
            type: 'string',
          },
          OrderStatus: {
            type: 'string',
          },
          UserId: {
            type: 'string',
          },
          ProductId: {
            type: 'string',
          } 
        },
         required: ['OrderId',"OrderStatus",'UserId','ProductId'],
      },
    },
    required: ['body'],
  };
  
  export const CreateBrandSchema=schema