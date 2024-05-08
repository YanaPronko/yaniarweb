<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);


	$name = $_POST['name'];
	$email = $_POST['email'];
	$text = $_POST['text'];

	// $mail->isSMTP();
	// $mail→SMTPDebug = 2;                                        //Send using SMTP
	// $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
	// $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	// $mail->Username   = 'yaniarz89';                     //SMTP username
	// $mail->Password   = 'boge kads rdlr trkd';                               //SMTP password
	// $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	// $mail->Port       = 465;


	//Від кого лист
	$mail->setFrom('yaniarz89@gmail.com', 'Портфолио'); // Вказати потрібний E-mail
	//Кому відправити
	$mail->addAddress('yaniar@tut.by'); // Вказати потрібний E-mail
	//Тема листа
	$mail->Subject = 'Новый заказ';

	//Тіло листа
	$body = '<h1>Письмо от Имя:</h1>' . $name . '<br>Email: ' . $email . '<br>Текст: ' . $text . '';

	//if(trim(!empty($_POST['email']))){
		//$body.=$_POST['email'];
	//}

	/*
	//Прикріпити файл
	if (!empty($_FILES['image']['tmp_name'])) {
		//шлях завантаження файлу
		$filePath = __DIR__ . "/files/sendmail/attachments/" . $_FILES['image']['name'];
		//грузимо файл
		if (copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Фото у додатку</strong>';
			$mail->addAttachment($fileAttach);
		}
	}
	*/

	$mail->Body = $body;

	//Відправляємо
	if (!$mail->send()) {
		$message = 'Помилка';
	} else {
		$message = 'Дані надіслані!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>