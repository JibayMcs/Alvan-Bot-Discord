var jsonContent = {
    "featured": [
        {
            "id": "01",
            "msg": "Salut à toi ! Installe toi ! Met toi bien !"
        },
        {
            "id": "02",
            "msg": "Hey ! La forme ? Met toi bien, bois un coup et chill un max !"
        },
        {
            "id": "03",
            "msg": "Salut toi ! Merci deta présence ! Pose toi au calme !"
        }
    ]
}

var random = jsonContent.featured[Math.floor(Math.random() * jsonContent.featured.length)];
console.log(random)