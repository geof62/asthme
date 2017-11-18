<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    protected function search()
    {

        $qs = null;
        if (array_key_exists('HTTP_REFERER', $_SERVER)) {
            $q = explode('&', $_SERVER['HTTP_REFERER']);
            foreach ($q as $k => $v) {
                if (substr($v, 0, strlen("q=")) == "q=") {
                    $qs = explode('+', substr($v, 2));
                }
            }
        }
        return ($qs);
    }

    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {

        $qs = $this->search();

        if (array_key_exists("treatment", $_GET))
            return $this->render('default/treatment.html.twig', [
                'search' => $qs
            ]);

        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
            'search' => $qs
        ]);
    }

    /**
     * @Route("/treatment", name="treatment")
     */
    public function treatmentAction(Request $request)
    {
    }


}
