import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customer/dtos/CreateCustomer.dto';
import { Customer } from 'src/customer/types/Customer';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'amandeep.p.2015@gmail.com',
      name: 'Aman aman'
    },
    {
      id: 2,
      email: 'adam@gmail.com',
      name: 'adam adam'
    },
    {
      id: 3,
      email: 'mandy@gmail.com',
      name: 'mandy mandy'
    },
  ];
  findCustomerById(id: number) {
      return this.customers.find((user)=>
      user.id ===id);
  }

  createCustomer(customerDto: CreateCustomerDto){
    this.customers.push(customerDto);
  }

  getCustomers(){
    return this.customers;
  }
}
