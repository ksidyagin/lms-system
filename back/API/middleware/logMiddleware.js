export function logger(req, res) {
    let request_path = "'" + req.method + ":" + req.baseUrl + req.path + "'";
    request_path = request_path.padEnd(40);

    console.log(
        get_current_time(process.env.UTC_DATETIME) +
            "\t" +
            request_path +
            " Status: " +
            res.statusCode
    );
}

function get_current_time(is_utc) {
    let res = ""; //result variable
    let hh, mm, ss;
    let data = new Date(); //init date
    if (is_utc === "true") {
        //if we need UTC format
        hh = data.getUTCHours(); //set UTC hours
        mm = data.getUTCMinutes(); //set UTC minutes
        ss = data.getUTCSeconds(); //set UTC seconds
    } else {
        hh = data.getHours(); //set local hours
        mm = data.getMinutes(); //set local minutes
        ss = data.getSeconds(); //set local seconds
    }

    if (hh < 10) {
        //making hours more readable
        res += "0";
    }
    res += hh + ":";

    if (mm < 10) {
        //making minutes more readable
        res += "0";
    }
    res += mm + ":";

    if (ss < 10) {
        //making seconds more readable
        res += "0";
    }
    res += ss;

    return res; //return time in formatted string
}
