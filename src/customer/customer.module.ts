import { MethodNotAllowedException, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CustomerController } from './controllers/customer/customer.controller';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { CustomerService } from './services/customer/customer.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(ValidateCustomerMiddleware,ValidateCustomerAccountMiddleware)
      .forRoutes(CustomerController);
  }
}




//if we want only few routes in middleware the we can use 
//  path: 'customer/user/:id',
//  Method: RequestMethod.GET

//  or if want to exclude some routes then use the same as above just by writing .exclude()