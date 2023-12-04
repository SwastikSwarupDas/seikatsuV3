import { Component } from '@angular/core';

declare var Razorpay: any;

@Component({
  selector: 'app-elites',
  templateUrl: './elites.component.html',
  styleUrls: ['./elites.component.scss']
})
export class ElitesComponent {
  payNow() {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'USD',
      amount: 17000,
      name: 'Sai',
      key: 'rzp_test_WyLkfRfd5Xz0yF',
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      prefill: {
        name: 'sai kumar',
        email: 'sai@gmail.com',
        phone: '9898989898'
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      }
    }
 
    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }
 
    const failureCallback = (e: any) => {
      console.log(e);
    }
 
    Razorpay.open(RozarpayOptions,successCallback, failureCallback)
  }
}
