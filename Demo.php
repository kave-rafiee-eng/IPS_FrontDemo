
<?php

$RootAddress = "/IOT/";

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>Ravis</title>

    <style>

        /* ظرف اسکرولی — دقت: جدول خود را block نکنید */
        .table-scroll {
            max-height: 250px;
            overflow: auto; /* هر دو جهت اسکرول را فعال می‌کند در صورت نیاز */
        }

        /* اطمینان از پهن شدن جدول و هم‌تراز شدن ستون‌ها */
        table.my-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed; /* کمک می‌کند ستون‌ها منظم بمانند */
        }

        table.my-table th,
        table.my-table td {
            padding: 1px;
            border: 1px solid #ddd;
            text-align: center;
            vertical-align: middle;
            white-space: nowrap; /* اگر می‌خواهی متن نشکند می‌توانید حذف کنی */
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* هدر چسبان */
        table.my-table thead th {
            position: sticky;
            top: 0;
            background: #ffffffff; /* یا color دلخواه */
            z-index: 5;
        }

        table.my-table thead tr:first-child th {
            height: 70px;        /* ارتفاع ثابت */
            line-height: 50px;   /* متن وسط چین می‌شود */
        }

        /* اگر می‌خواهی هدر دوم (ردیف دوم هدر) هم چسبان بماند */
        table.my-table thead tr:nth-child(2) th {
            position: sticky;
            top: 70px; /* ارتفاع ردیف اول هدر رو تخمینی بزن؛ اگر ارتفاع واقعی متفاوت بود تنظیم کن */
            z-index: 6;
        }

        /* بهتر است ارتفاع ردیف هدر را واضح کنیم تا top درست شود */
        table.my-table thead th {
            height: 40px;
            line-height: 40px;
        }

        .main {
            margin-left: 0 !important; /* حذف فاصله سایدبار */
        }
    </style>

    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Favicons -->
    <link href="<?php echo $RootAddress ?>assets/img/favicon.png" rel="icon">
    <link href="<?php echo $RootAddress ?>assets/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Vendor CSS Files -->
    <link href="<?php echo $RootAddress ?>assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo $RootAddress ?>assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="<?php echo $RootAddress ?>assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="<?php echo $RootAddress ?>assets/vendor/quill/quill.snow.css" rel="stylesheet">
    <link href="<?php echo $RootAddress ?>assets/vendor/quill/quill.bubble.css" rel="stylesheet">
    <link href="<?php echo $RootAddress ?>assets/vendor/remixicon/remixicon.css" rel="stylesheet">
    <link href="<?php echo $RootAddress ?>assets/vendor/simple-datatables/style.css" rel="stylesheet">

    <!-- Template Main CSS File -->
    <link href="<?php echo $RootAddress ?>assets/css/style.css" rel="stylesheet">

    <!-- =======================================================
    * Template Name: NiceAdmin
    * Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
    * Updated: Apr 20 2024 with Bootstrap v5.3.3
    * Author: BootstrapMade.com
    * License: https://bootstrapmade.com/license/
    ======================================================== -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.2/mqttws31.min.js" type="text/javascript"></script>


</head>

<body   >

<?php
//include "../../../../header.php";
?>

<?php
//include "../../../../Sidebar.php";
?>

<main  id="main" class="main">

    <div class="pagetitle">

        <h1>branch</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/GSM_RAVIS/main/home.php">Monitoring</a></li>
                <li class="breadcrumb-item active">Error</li>
            </ol>
        </nav>
    </div><!-- End Page Title -->

    <section class="section">
        <div class="row">

            <div class="col-lg-9">
                <div class="card"  >
                    <div class="card-body ">
                        <h5 class="card-title">CHart</h5>
     
                        <div class="row">

                            <div class="col-lg-10">
                                <table class="my-table" id="myTable">
                                    <thead>
                                        <tr>
                                            <th rowspan="2" >Order</th>
                                            <th rowspan="2">SlabNumber</th>
                                            <th colspan="2">Location</th>
                                            <th colspan="2">Target</th>
                                        </tr>
                                        <tr>
                                            <th>x1</th>
                                            <th>y1</th>
                                            <th>x2</th>
                                            <th>y2</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    </tbody>
                                </table>
                            </div>

                            <div class="col-lg-2">
                                <div class="card p-3">
                                <h5 class="card-title text-center">AZMAN SANAT</h5>
                                <p class="text-muted">Slab Management System</p>
                                </div>

                                <div class="card p-3">
                                    <p class="text-muted">Current Location</p>
                                    <div class="d-flex align-items-center mb-3">
                                            <span>X loc  </span>

                                            <!-- مربع با عدد -->
                                            <div id="" style="
                                                width: 50px;
                                                height: 50px;
                                                background-color: black;
                                                color: white;
                                                display: flex;
                                                justify-content: center;
                                                align-items: center;
                                                font-weight: bold;
                                                border-radius: 4px;
                                                margin-right: 10px;
                                                margin-left: 20px;
                                            ">
                                                22
                                            </div>
                                        </div>

                                        <div class="d-flex align-items-center mb-3">
                                            <span>Y loc  </span>

                                            <!-- مربع با عدد -->
                                            <div id="" style="
                                                width: 50px;
                                                height: 50px;
                                                background-color: black;
                                                color: white;
                                                display: flex;
                                                justify-content: center;
                                                align-items: center;
                                                font-weight: bold;
                                                border-radius: 4px;
                                                margin-right: 10px;
                                                margin-left: 20px;
                                            ">
                                                22
                                            </div>
                                        </div>  
                                </div>

              
                            </div>

                        </div>



                        <!--
                        <div class="table-scroll">
                            <table class="my-table" id="myTable">
                            <thead>
                                <tr>
                                    <th rowspan="2" >Order</th>
                                    <th rowspan="2">SlabNumber</th>
                                    <th colspan="2">Location</th>
                                    <th colspan="2">Target</th>
                                </tr>
                                <tr>
                                    <th>x</th>
                                    <th>y</th>
                                    <th>x</th>
                                    <th>y</th>
                                </tr>
                            </thead>

                            <tbody>
                            </tbody>
                            </table>
                        </div>
                        -->

                    </div>

                </div>
            </div>
            
            <div class="col-lg-3">
                <div class="card"  >
                    <div class="card-body ">
                        <h5 class="card-title">CHart</h5>



                    </div>

                </div>
            </div>


        </div>
    </section>

</main><!-- End #main -->




<?php
//include "../Footer.php";
?>

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>


<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.2/mqttws31.min.js" type="text/javascript"></script>

<?php
$version = '1.1.0'; // فقط این نسخه را تغییر دهید
?>

<!-- Vendor JS Files -->
<script  src="mqtt.js?v=<?php echo $version; ?>"></script>
//<script  src="Demo.js?v=<?php echo $version; ?>"></script>

<!-- Vendor JS Files -->
<script src="<?php echo $RootAddress ?>assets/vendor/apexcharts/apexcharts.min.js"></script>
<script src="<?php echo $RootAddress ?>assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="<?php echo $RootAddress ?>assets/vendor/chart.js/chart.umd.js"></script>
<script src="<?php echo $RootAddress ?>assets/vendor/echarts/echarts.min.js"></script>
<script src="<?php echo $RootAddress ?>assets/vendor/quill/quill.js"></script>
<script src="<?php echo $RootAddress ?>assets/vendor/simple-datatables/simple-datatables.js"></script>
<script src="<?php echo $RootAddress ?>assets/vendor/tinymce/tinymce.min.js"></script>
<script src="<?php echo $RootAddress ?>assets/vendor/php-email-form/validate.js"></script>

<!-- Template Main JS File -->
<script src="<?php echo $RootAddress ?>assets/js/main.js"></script>
</body>

</html>