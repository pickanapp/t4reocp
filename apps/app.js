var firestore = firebase.firestore();
var auth = firebase.auth()

auth.onAuthStateChanged((user) => {
    if (user) {


        function addApp(name, id) {
            var appContainer = g("apps")

            var li = c("li")
            var link = c("a")

            link.className = "full-screen-select__option"
            link.innerText = name
            link.href = "#"
            link.onclick = function () {
                closeModal(0);
                window.setTimeout(
                    function () {
                        openModal(1)
                        g("btnAdd")
                            .addEventListener("click", () => {
                                var prospect = g("textProspect").value
                                firestore
                                    .collection("apps")
                                    .doc(id)
                                    .collection("services")
                                    .add({
                                        name: prospect,
                                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                    }).then(() => {
                                        closeModal(1)
                                    }).catch((e) => {
                                        console.log(e)
                                    })
                            })
                    },
                    100
                )
            }

            li.appendChild(link)
            appContainer.appendChild(li)
        }

        async function addCat(name, id) {
            var category = c("div")
            category.innerHTML = `
            <h1>`+ name + `</h1>
                <ol class="list list--ol" id="`+ id + `">
                    
                </ol>
            `
            g("categories").appendChild(category)

            await firestore
                .collection("apps")
                .doc(id)
                .collection("services")
                .onSnapshot((querySnapshot) => {
                    g(id).innerHTML = ""
                    querySnapshot.forEach((service) => {
                        var serviceData = service.data()
                        var serviceContainer = c("li")
                        serviceContainer.innerText = serviceData.name
                        g(id).appendChild(serviceContainer)
                    });
                });
        }

        firestore
            .collection("apps")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var app = doc.data()
                    addCat(app.name, doc.id)
                    addApp(app.name, doc.id)
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }
})