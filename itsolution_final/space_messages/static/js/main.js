var getMthLDay = function(mtn, yr){
	var Nyear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var Lyear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if(Number(yr))
		return Lyear[Number(mtn-1)]
	else
		return Nyear[Number(mtn-1)]
};

var leapYear = function (year)
{
	year = Number(year);
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
};

var calc_percent = function(debt, pay_p, days_in_year){
	return debt*pay_p/days_in_year/100;
};

var monthDiff = function (d1, d2) {
    var months;
    months = (Number(d2.split('-')[0]) - Number(d1.split('-')[0])) * 12;
    months -= Number(d1.split('-')[1]);
    months += Number(d2.split('-')[1])+1;
    return months <= 0 ? 0 : months;
};



String.prototype.Format = function(){
		if(this.length==1)
			return '0'+this;
		else
			return this;
};



var calc = function(payments, pay_p, pay_day){
	var percents = [];
	var SMth = Number(payments[0]['date'].split('-')[1]);
	var Syear = Number(payments[0]['date'].split('-')[0]);
	var Fyear = Number(payments[payments.length - 1]['date'].split('-')[0]);
	var FMth = Number(payments[payments.length - 1]['date'].split('-')[1]);
	var Mth = SMth;
	var year = Syear;
	var day = Number(payments[0]['date'].split('-')[2])+1;
	var debt = Number(payments[0]['pay_out']);
	var payment = 1;
	var percent = 0;
	var date;
	var p_d;
	while(true){
			if(day>getMthLDay(Mth, leapYear(year))){
				day=1;
				Mth++;
			}

			if(Mth>12){
				Mth=1;
				year++;
			}

			if(pay_day>getMthLDay(Mth, leapYear(year)))
				p_d=getMthLDay(Mth, leapYear(year));
			else
				p_d=pay_day;


			date = String(year)+'-'+String(Mth).Format()+'-'+String(day).Format();
			percent += calc_percent(debt, pay_p, 365+Number(leapYear(year)));
			
			if(date == payments[payment]['date']){

				debt+=Number(payments[payment]['pay_out'])-Number(payments[payment]['pay_in']);
				payment++;
			}

			if(day==p_d){
				percents.push({date: date, debt: debt, percent: percent});
				percent = 0;
			}
			if(payment==payments.length){
				date = payments[payments.length - 1]['date'];
				percents.push({date: date, debt: debt, percent: percent});
				break;
			}

			day++;
		}
	return percents;	
};
	


var n_pm = new Vue({
    el: '#new_pay',
    data: {
        date: null,
        pay_out: null,
        pay_in: null,
        pay_day: null,
        pay_p: null,
        payments: [],
        percents: [],
        sum_percents: null,
    },
    methods: {
        add_pay: function(){
            //fetch('http://workrork.beget.tech/api/add_payment?date='+String(this.date)+'&pay_out='+'1'+'&pay_in='+(String(this.pay_in)!=='') ? (String(this.pay_in)):('0'));
            if(this.date!=null){
            if(((this.pay_out==null)^(this.pay_in==null))){
            this.payments.push({date : this.date, pay_out: this.pay_out, pay_in: this.pay_in});
            this.date = null;
            this.pay_out = null;
            this.pay_in = null;
            }else{
                alert("Нельзя взять в долг и часть отдать(")
            }
            }else{
                alert("Не указанна дата!")
            }
        },
        new_task: function(){
          this.payments = [];
          this.percents = [];
          this.pay_p = null;
          this.pay_day = null;
        },
        solute: function(){
           if(this.pay_day=='' | Number(this.pay_day)>31){
               alert("Неверно указан день начислеиня процентов!");
           }else if(this.pay_p==''){
               alert("Неверно указан процент!");
           }else{
               var allin=0;
               var allout=0;
               this.payments.forEach(function(payment, i, arr){
                   allin+= Number(payment['pay_in']);
                   allout+= Number(payment['pay_out']);
               });
               if(allin==allout){
                   this.percents = calc(this.payments, this.pay_p, this.pay_day);
                   var sum=0;
                   this.percents.forEach(function(item, i, ar){
                        sum+=Number(item['percent']);
                   });
                   this.sum_percents=sum;
               }else{
                   alert("Кредит не погашен!")
               }
           
           }
        },
    },
    filters: {
      round: function (value) {
        return Math.round(value*100)/100;
      }
    },
    delimiters: ['[[',']]']
});
