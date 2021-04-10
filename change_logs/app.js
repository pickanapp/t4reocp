// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDg7_HL7zdXhyk_ERRIaJ3G8P8si3MujKc",
    authDomain: "pickaapp-79307.firebaseapp.com",
    databaseURL: "https://pickaapp-79307.firebaseio.com",
    projectId: "pickaapp-79307",
    storageBucket: "pickaapp-79307.appspot.com",
    // messagingSenderId: "751464223460",
    appId: "1:751464223460:web:4035d9ce7d55da5cde12f1"
});

// Initialize Cloud Functions through Firebase
var functions = firebase.functions();

var item = {
    deprecatedFeatures: [],
    fixes: [],
    newFeatures: []
}

function addItem(itemType, targetList, targetValue) {

    targetList.querySelectorAll('*').forEach(n => n.remove())

    var itemArr = item[itemType]
    itemArr.push(targetValue.value)

    for (const foo of item[itemType]) {
        var itm = c("li")
        itm.innerText = foo
        targetList.appendChild(itm)
        targetValue.value = ""
    }
}

g("addNf").addEventListener("click", () => {
    addItem(
        "newFeatures",
        g("featureList"),
        g("nf")
    )
})

g("addFix").addEventListener("click", () => {
    addItem(
        "fixes",
        g("fixesList"),
        g("fx")
    )
})

g("addDf").addEventListener("click", () => {
    addItem(
        "df",
        g("dfList"),
        g("df")
    )
})

var admin = firebase.functions().httpsCallable('admin');

g("addVersion").addEventListener("click", () => {
    item.version = g("vn").value

    admin({
        PAAPIN: g("x").value,
        actionID: "version",
        changeLog: item
    }).then((res) => {
        if (res.res == 1) {
            console.log(res.message)
        } else {
            console.log(res.message)
        }
    })
})