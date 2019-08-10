
//checks last 6 months

var alvaro_stats = (function(){
    //var country = 'Russian+Federation';
    var country = 'Korea%2C+Republic+of';
    //var country = 'China';

    var self = this;
    var d = new Date();
    var g_currentMonth = d.getMonth();
    var g_currentYear = d.getFullYear();
    var g_dates_after = [];
    var g_dates_before = [];

    self.g_dates_before = g_dates_before;
    self.stats = [];

    function init(){
        getDatesTocheck();
        $('#to').val('#seller').trigger('change');

        checkMonths();
    }

    function checkMonths(){

        g_dates_before.forEach(function(items, index){
            var before = items.gumroadFormat;
            var beforeDateFormat = items.dateFormat;

            //console.log('https://gumroad.com/installments/updated_recipient_count?paid_more_than=&paid_less_than=&from_country='+country+'&type=seller&created_after='+g_dates_after[index].gumroadFormat+'&created_before='+before);
            $.ajax({
                type: 'GET',
                async: false,
                url: 'https://gumroad.com/installments/updated_recipient_count?paid_more_than=&paid_less_than=&from_country='+country+'&type=seller&created_after='+g_dates_after[index].gumroadFormat+'&created_before='+before,
                success: function(data){
                    console.log(data);
                    var statsMonth = getValidDate(beforeDateFormat.getMonth()-1 ,beforeDateFormat.getFullYear());
                    self.stats.push({
                        year: statsMonth.year,
                        month: statsMonth.month,
                        country: country,
                        sells: data.recipient_count
                    });
                }
            });
        });
    }


    function getValidDate(month, year){
        if (month < 0){
            console.log("month", month);
            month = 11;
            year = g_currentYear -1;
        }

        if(month > 11){
            month = 0;
            year = year + 1;
        }

        return {
            month: month,
            year: year
        }
    }
    /*
    $('[for="date_after"]').next().val('01/04/2017');
    $('[for="date_before"]').next().val('01/05/2017');
    */

    function getDatesTocheck(){
        var month = g_currentMonth;
        var year = g_currentYear;

        var validDateAfter = getValidDate(month-1, year);
        var validDateBefore = getValidDate(month+1, year);

        g_dates_before.push(getStringDate(31, validDateBefore.month, validDateBefore.year));
        g_dates_after.push(getStringDate(31, validDateAfter.month, validDateAfter.year));

        console.log("before: " + validDateBefore.year + '/' + validDateBefore.month + "/" + 1);
        console.log("after: " + validDateAfter.year + '/' + validDateAfter.month + "/" + 31);
        console.warn(month);
        for(var i = 1; i<7; i++){
            month = getValidDate(month-1, year).month - 1;

            validDateAfter = getValidDate(month-1, year);
            validDateBefore = getValidDate(month+1, year);

            // new Date("2015-03-25")

            console.log("before: " + validDateBefore.year + '/' + validDateBefore.month + "/" + 1);
            console.log("after: " + validDateAfter.year + '/' + validDateAfter.month + "/" + 31);
            console.log("before: ");
            console.log(getStringDate(31, validDateBefore.month, validDateBefore.year));
            console.log("after: ")
            console.log(getStringDate(31, validDateAfter.month, validDateAfter.year));
            console.log("");
            g_dates_before.push(getStringDate(31, validDateBefore.month, validDateBefore.year));
            g_dates_after.push(getStringDate(31, validDateAfter.month, validDateAfter.year));
        }
    }

    //we need this format Sat+Apr+01+2017
    function getStringDate(day, month, year){
        //return getTwoDigits(day) + '/' + getTwoDigits(month) + '/' + year;

        var dateFormat = new Date(year, getTwoDigits(month), getTwoDigits(day));
        return {
            dateFormat: dateFormat,
            gumroadFormat: `${getDayWeek(dateFormat)}+${getMonthName(dateFormat)}+${getTwoDigits(day)}+${year}`
        };
    }

    function getDayWeek(dateValue){
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        return days[dateValue.getDay()].substring(0, 3);
    }

    function getMonthName(dateValue){
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        return months[dateValue.getMonth()].substring(0, 3);
    }

    function getTwoDigits(value){
        if(value.toString().length < 2){
            return '0' + value;
        }
        return '' + value;
    }

    init();
    return self;
})();