<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light noprint">
    <div class="container-fluid">

        <a class="navbar-brand" href="index.php">Ausentismo 📅 - <?php echo $User ?> - <?php echo $Grupo ?></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link <?php echo $active_abm?>" <?php echo $no_es_admin?> href="abm.php">ABM Motivos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo $active_cargar ?>" <?php echo $no_es_admin ?> href="cargar.php">Cargar</a>
                </li>
                <li <?php echo $solo_reportes?>  class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        Reportes
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><a class="dropdown-item" href="reporte_listado.php">Reporte Listado</a></li>
                        <li><a class="dropdown-item" href="reporte_agrupado.php">Reporte Agrupado</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="../Login/logout.php">
                        <button class="btn btn-primary">Salir</button>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>