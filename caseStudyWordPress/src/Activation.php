<?php

namespace caseStudyWordPress;

class Activation {

	public static function activate() {

		$role = get_role( 'administrator' );

		if ( ! empty( $role ) ) {
			$role->add_cap( 'case-study-wordpress' );
		}
	}
}

?>