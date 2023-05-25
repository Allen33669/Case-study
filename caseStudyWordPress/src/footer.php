<?php

namespace caseStudyWordPress;

add_action('save_post', 'caseStudyWordPress\set_post_default_category', 10, 3);

function set_post_default_category($post_id, $post, $update) {
    //only add footer content in new diary
    if ($post->post_content == ''){

    	remove_action('save_post', 'caseStudyWordPress\set_post_default_category');

        //add diary footer content
    	$city = get_option('cswp-diary-city');
    	$footerContent = get_option('cswp-diary-footer-content');

    	if ($city){
            //please fill your own appid
    		$response = wp_remote_get( 'https://api.openweathermap.org/data/2.5/weather?q=' . $city . '&appid=',
    			array()
    		);

    		$responseBody = wp_remote_retrieve_body( $response );
            $responseBodyObj = json_decode($responseBody, false);
            
            $backgroundImage = 'background-image: url(https://magdeleine.co/wp-content/uploads/2016/12/638-1400x933.jpg);';
            $textColor = ' color: rgba(30, 30, 30, 0.8);';

            //select style based on the weather condition
            if (str_contains(strtolower($responseBodyObj->weather[0]->main), 'thunderstorm')){
            	$backgroundImage = 'background-image: url(https://magdeleine.co/wp-content/uploads/2017/01/j-jcl9idkve-redd-angelo-1400x788.jpg);';

            } elseif (str_contains(strtolower($responseBodyObj->weather[0]->main), 'drizzle')) {
            	$backgroundImage = 'background-image: url(https://magdeleine.co/wp-content/uploads/2019/12/iso-republic-tree-water-droplet-1400x933.jpg);';
            	
            } elseif (str_contains(strtolower($responseBodyObj->weather[0]->main), 'rain')) {
            	$backgroundImage = 'background-image: url(https://magdeleine.co/wp-content/uploads/2019/09/34740607486_5ed846cbbf_o-1-1400x933.jpg);';
            	$textColor = ' color: rgba(255, 255, 255, 0.8);';
            	
            } elseif (str_contains(strtolower($responseBodyObj->weather[0]->main), 'snow')) {
            	$backgroundImage = 'background-image: url(https://magdeleine.co/wp-content/uploads/2017/12/eberhard-grossgasteiger-465658-1400x933.jpg);';
            	
            } elseif (str_contains(strtolower($responseBodyObj->weather[0]->main), 'atmosphere')) {
            	$backgroundImage = 'background-image: url(https://magdeleine.co/wp-content/uploads/2019/06/30433378728_ede9b8e6ba_o-1400x935.jpg);';
            	
            } elseif (str_contains(strtolower($responseBodyObj->weather[0]->main), 'clear')) {
            	$backgroundImage = 'background-image: url(https://magdeleine.co/wp-content/uploads/2019/08/15744592346_19e2714486_o-1400x930.jpg);';
            	
            } elseif (str_contains(strtolower($responseBodyObj->weather[0]->main), 'clouds')) {
            	$backgroundImage = 'background-image: url(https://magdeleine.co/wp-content/uploads/2019/09/woman-wanderer_4460x4460-1400x933.jpg);';
            	
            } else {
            	$textColor = ' color: rgba(255, 255, 255, 0.8);';
            }
            
            //add footer content into new content
        	$new_content = $post->post_content . 
        	      '<div style="height: 200px; width: 100%; position: relative; align-items: center;	display: flex;
	                flex-direction: column;	justify-content: center; border-radius: 25px; background-attachment: fixed;'
	                . $backgroundImage . '">
	                <p style="font-family: Georgia;
	                  font-size: 24px;' . $textColor . ' text-shadow: 0 0 5px #939393;" >' . $city . ', ' . $responseBodyObj->weather[0]->description. ', ' . $responseBodyObj->main->temp .'°C</p>'
	              . '<p style="font-family: Georgia;
	                  font-size: 24px;' . $textColor . ' text-shadow: 0 0 5px #939393;" >' . $footerContent . '</p>
	              </div>
	              <div style="display: flex; flex-direction: row; height: 50px; width: 100%;">
	              <img src="http://localhost/wp-content/plugins/caseStudyWordPress/resource/OpenWeatherLogo.jpg" style="height: 24px; height: 24px;">
	              <p style=" color: rgba(100, 100, 100, 0.8); text-shadow: 0 0 5px #939393;">Weather data provided by OpenWeather https://openweathermap.org/</p>
	              
	              </div>';
        } else {
        	$new_content = $post->post_content . '<p style="font-family: Georgia;
	              font-size: 24px; color: rgba(0, 0, 0, 1.0); text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;" >Diary footer</p>';
        }
    	
    	wp_update_post(array(
    		'ID' => $post_id,
    		'post_content' => $new_content
    	));

    	add_action('save_post', 'caseStudyWordPress\set_post_default_category', 10, 3);

    	return;
    }
        
    return;
}



?>