const system = firebase.functions().httpsCallable('system')
const user = firebase.functions().httpsCallable('user')
var TID = null

function getReference(ref, amount) {
    system({
        actionID: "CR",
        reference: ref,
        amount: parseFloat(amount)
    }).then(function (foo) {
        const data = foo.data
        // Read result of the Cloud Function.
        if (data.res == 1) {
            console.log(data)
            TID = data.TID
            openModal(modal[0], data.TID)
            // })
        } else {
            snackBar(data.message)
        }
    }).catch(function (error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.log(error)
        // ...
    });
}

g("evaluate_btn").addEventListener("click", () => {
    if (TID !== null) {
        user({
            PAAPIN: g("PAAPIN").value,
            actionID: "payment",
            TID: TID
        }).then(function (foo) {
            const data = foo.data
            // Read result of the Cloud Function.
            if (data.res == 1) {
                snackBar(data.message)
            } else {
                console.log(data)
                snackBar(data.message)
            }
        }).catch(function (error) {
            // Getting the Error details.
            var code = error.code;
            var message = error.message;
            var details = error.details;
            console.log(error)
            // ...
        });
    } else snackBar("Reference cannot be null!")
})