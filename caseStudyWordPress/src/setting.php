<?php

namespace caseStudyWordPress;

//register submenu diary setting
add_action( 'admin_menu', 'caseStudyWordPress\cSWP_diarySetteing' );

//add diary setting submenu into settings
function cSWP_diarySetteing(){
	add_options_page('Diary setting', 'Diary Setting', 'manage_options','diary-setting', 'caseStudyWordPress\cSWP_diarySettingPage');        
}

//style diary setting page
function cSWP_diarySettingPage(){
	?>
    <link rel="stylesheet" href="http://localhost/wp-content/plugins/caseStudyWordPress/src/index.css">

    <div id="cswp-case-study-wordpress"></div>

    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://unpkg.com/@mui/material@latest/umd/material-ui.development.js"></script>
    <script type="module" src="http://localhost/wp-content/plugins/caseStudyWordPress/src/index.js"></script>    

    <?php
}



//handle submit from diary setting
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	if (isset($_POST['city'])){
		$city = $_POST['city'];
		$footerContent = $_POST['footerContent'];
        update_option('cswp-diary-city', $city);
        update_option('cswp-diary-footer-content', $footerContent);
	}

}



?>