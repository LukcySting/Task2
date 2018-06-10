var n_pm = new Vue({
    el: '#new_pay',
    data: {
        date: '',
        pay_out: '',
        pay_in: '',
        payments: [],
    },
    methods: {
        add_pay: function(){
            //fetch('http://workrork.beget.tech/api/add_payment?date='+String(this.date)+'&pay_out='+'1'+'&pay_in='+(String(this.pay_in)!=='') ? (String(this.pay_in)):('0'));
            this.payments.push({date : this.date, pay_out: this.pay_out, pay_in: this.pay_in});
        },
        new_task: function(){
          this.payments = [];  
        },
    },
    delimiters: ['[[',']]']
});
