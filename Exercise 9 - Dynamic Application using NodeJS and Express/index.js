var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("dynamic");
    const prompt = require('prompt-sync')({ sigint: true });
    console.log("MENU\n1.Insert\n2.Update\n3.Delete\n4.Display");
    var option = prompt('Enter the option : ');
    switch (option) {
        case '1':
            var no_of_students = prompt('Enter number of students: ');
            var myobj = [];
            var iter = 0;
            for (iter = 0; iter < no_of_students; iter++) {
                var name = prompt("Enter the Name : ");
                var clg_name = prompt("Enter your college name: ");
                myobj.push({ name: name, clg_name: clg_name });
            }
            dbo.collection("demo").insertMany(myobj, function (err, res) {
                console.log("Inserting data :");
                if (err) throw err;
                console.log("Number of document(s) inserted : " + res.insertedCount + "\n");
                db.close();
            });
            break;
        case '2':
            var u_name = prompt("Enter the name to be updated : ");
            var myquery = { name: u_name };
            var u_clg_name = prompt("Enter the new college name: ");
            var newvalues = { $set: { clg_name: u_clg_name } };
            dbo.collection("demo").updateMany(myquery, newvalues, function (err, res) {
                console.log("\nUpdating data :");
                if (err) throw err;
                if (res.result.nModified == 0) {
                    console.log('No match found!\n');
                }
                else {
                    console.log("Number of document(s) updated : " + res.result.nModified + "\n");
                }
                db.close();
            });
            break;
            break;
        case '3':
            console.log('\tDELETE MENU:\n\t1.Delete specific data\n\t2.Delete all data')
            var del_option = prompt('\tSelect an option : ');
            switch (del_option) {
                case '1':
                    var del_clg_name = prompt('Enter the college name to be deleted : ');
                    var myquery = { clg_name: del_clg_name };
                    dbo.collection("demo").deleteMany(myquery, function (err, obj) {
                        if (err) throw err;
                        if (obj.result.n == 0) {
                            console.log('No match found!\n');
                        }
                        else {
                            console.log("Number of document(s) deleted : " + obj.result.n + "\n");
                        }
                        db.close();
                    });
                    break;
                case '2':
                    dbo.collection("demo").deleteMany(function (err, res) {
                        console.log("\nDeleting data :");
                        if (err) throw err;
                        if (res.result.n == 0) {
                            console.log('Collection is empty!\n')
                        }
                        else {
                            console.log("Number of document(s) deleted : " + res.result.n + "\n");
                        }
                        db.close();
                    });
                    break;
                default:
                    console.log('Enter valid option.\n');
                    db.close();
            }
            break;
        case '4':
            dbo.collection("demo").find({}, { projection: { _id: 0, name: 1, clg_name: 1 } }).toArray(function (err, result) {
                console.log("\nDisplaying data :");
                if (err) throw err;
                // console.log(result);
                if (result.length == 0) {
                    console.log('Collection is empty!\n');
                }
                else {
                    var i;
                    for (i = 0; i < result.length; i++) {
                        console.log("Name : " + result[i].name + ", College name : " + result[i].clg_name);
                    }
                    console.log('\n');
                }
                db.close();
            });
            break;
        default:
            console.log('Enter valid input.\n');
            db.close();
    }
});