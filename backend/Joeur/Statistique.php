<!doctype html>
<html>
	<head>	
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width...">
		<title>Yemisi page</title>
        <link rel="stylesheet" href="ma_feuille_style.css">
          <!--   Bootstrap librairies-->
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
          <script  defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
         
        
	</head>

    <body>
        <div class = "navbar">
            <a href="Statistique.html">Rank</a>
            <a href="Equipe.html">Equipe</a>
            <a href="Match.html">Game</a>
            <a href="Information_Personnelle.html">Information Personelle</a>

        </div> 
        <!--  La page commence ici-->
        <br> 
    <center>
        <ul id = "categories">
            <h2> Est-ce que vous voulez ...</h2>
             <li><a href = "Statistique.html?categorie=1"> Vos stastistique       </a></li>
             <li><a href = "Statistique.html?categorie=2"> Équipe stastistique    </a></li>							
             <li><a href = "Statistique.html?categorie=3"> Leaugue Rang           </a> </li>
             <li><a href=  "Statistique.html?categorie=4"> Joeurs Rang           </a> </li>
        </ul>
    </center>

        

        <!--  Les stats personelles des joeurs-->

        <br>

        <ul id = "tasks">
        <center>
    
            <li data-category= 1 ><img src="Gold_FIFA.webp" class="img_fluid" alt="Responsive image" style = "width: 50% "></li>
            
        </center>   

        <!--  Les stats personelles de son equipe-->

    <ul id ="tasks">
    <li data-category = 2>
    <center><h3> Nom Equipe </h3><center>
        <div class="container">
            <div class = "row">
                <div class="col" style = "border:1px solid black;">
                 
                    Rang
                </div>
                <div class="col" style = "border:1px solid black;">
                    
                    Nom Joeur
                </div>
                <div class="col" style = "border:1px solid black;">
                    Buts
                </div>
                <div class="col" style = "border:1px solid black;" >
                    Assist
                </div>
                <div class="col" style = "border:1px solid black;" >
                    Cartons
                </div>
            </div>
            <div class = "row">
                <div class="col" style = "border:1px solid black;">

                    <div id = "rangJouerEquipe">
                    Column
                    </div>

                </div>
                <div class="col" style = "border:1px solid black;">

                    <div id = "nomJoeurEquipe">
                    Column
                    </div>

                </div>
                <div class="col" style = "border:1px solid black;">

                    <div id = "butsEquipe">
                        Column
                    </div>

                </div>
                <div class="col" style = "border:1px solid black;" >
                
                    <div id = "assistsEquipe">
                    Column
                    </div>
                </div>
                <div class="col" style = "border:1px solid black;" >
                    
                    <div id = "CartonsEquipe">
                    Column
                    </div>

                </div>
            </div>                  
            
        </div>


        <?php 
            
            try{
                //Creer une connexion a la base de donnee
                $conn = new PDO("mysql:host=localhost;dbname=equipe201", "root", " ");// connection a la bd
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                //Recuperer les informations de la base de donnee
                $bd = "SELECT nom, Categories, Wins, Loss, Ties FROM equipe";
                
                // chercher les valeurs
                $valeur = $conn->query($bd);

                //Verifier si il y a des donner
                if ($valeur ->rowCount() > 0) {

                    while ($row = $valeur->fetch(PDO::FETCH_ASSOC)) {

                    }
                }
                        



        ?> 
    </li>
    </ul>





    <br>
    <!--  Les stats de sa Leaugue-->
    <ul id ="tasks">
        <li data-category = 3>
            <div class="container">
                <div class = "row">
                    <div class="col" style = "border:1px solid black;">
                        
                        Rang
                    </div>
                    <div class="col" style = "border:1px solid black;">
                        Nom d'Équipe
                    </div>
                    <div class="col" style = "border:1px solid black;" >
                        Wins
                    </div>
                    <div class="col" style = "border:1px solid black;" >
                        Ties
                    </div>
                    <div class="col" style = "border:1px solid black;" >
                        Loss
                    </div>
                </div>
                <div class = "row">
                    <div class="col" style = "border:1px solid black;">
                        
                        <div id = "rangLeague">
                        Column
                        </div>

                    </div>
                    <div class="col" style = "border:1px solid black;">

                        <div id = "nomEquipeLeaugue">
                        Column
                        </div>

                    </div>
                    <div class="col" style = "border:1px solid black;" >
                        Wins
                    </div>
                    <div class="col" style = "border:1px solid black;" >
                        Ties
                    </div>
                    <div class="col" style = "border:1px solid black;" >
                        Loss
                    </div>
                </div>  
            </div>
        </li>
    </ul>




         <!--  Les stats des Joeurs-->

         <ul id ="tasks">
            <li data-category = 4>
                <div class="container">
                    <div class = "row">
                        <div class="col" style = "border:1px solid black;">
                            
                            Rang
                        </div>
                        <div class="col" style = "border:1px solid black;">
                            Nom Joeur
                        </div>
                        <div class="col" style = "border:1px solid black;" >
                            Points  <!-- Est-ce que je mes juste genre des points ou des stats ou les deux-->
                        </div>
                    </div>
                    <div class = "row">
                        <div class="col" style = "border:1px solid black;">
                            
                            <div id = "rangJouer">
                            Column
                            </div>

                        </div>
                        <div class="col" style = "border:1px solid black;">

                            <div id = "nomJoeurGlobal">
                            Column
                            </div>

                        </div>
                        <div class="col" style = "border:1px solid black;" >

                            <div id = "pointsGlobal">
                            Column
                            </div>

                        </div>
                    </div>  
                </div>
            </li>
        </ul>         




    <script>
			
        document.addEventListener('DOMContentLoaded', function() {
            const categoryLinks = document.querySelectorAll('#categories a');
            // Cacher les tache
            CacheTache();
            categoryLinks.forEach(function(link) {
                link.addEventListener('click', function(event) {
                    event.preventDefault(); 
                    
                    // Prendre le numero de la categorie du href attribue
                    const categoryId = link.getAttribute('href').split('=')[1];
                    
                    // Cacher les tache
                    CacheTache();
        
                    // Call la fonction pour afficher les tache par categorie
                    TacheParCategorie(categoryId);
                });
            });
        
            // Fonction cacher les tache
            function CacheTache() {
                const tasks = document.querySelectorAll('#tasks li');
                tasks.forEach(function(task) {
                    task.style.display = 'none';
                });
            }
            // Fonction affiche tache conrrespondant a sa category
            function TacheParCategorie(categoryId) {
            
                const tasks = document.querySelectorAll('#tasks li');
                tasks.forEach(function(task) {
                    if (task.dataset.category === categoryId) {
                        task.style.display = 'block';
                    } 
                });
            }
        });
        </script>


    </body>
</html>