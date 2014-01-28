<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Webindex extends CI_Controller {
	public function __construct()
	 {
		 parent::__construct();
	 }
	public function index()
	{
		$this->load->view('oauth/header.php');
		$this->load->view('oauth/index.php');
		$this->load->view('oauth/footer.php');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */