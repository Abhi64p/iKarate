class DateTime{

    getDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (day < 10)
            day = '0' + day;
        if (month < 10)
            month = '0' + month;
        return year + '-' + month + '-' + day;
    }

    getTime() {
        let date = new Date();
        let A = 'AM';
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        if (hour == 0)
            hour = 12;
        else if (hour > 12) {
            hour -= 12;
            A = 'PM';
        }
        return hour + ':' + minute + ':' + second + ' ' + A;
    }
}

export default DateTime;