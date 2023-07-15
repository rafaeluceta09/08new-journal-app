

export const uploadImage = async (file) =>{

    let urlServ = 'https://api.cloudinary.com/v1_1/uzcloudinary/image/upload';

    let formDataImg = new FormData();
    formDataImg.append ( 'upload_preset','react-images' );
    formDataImg.append ( 'file',file );

    try {

        const resp = await fetch(urlServ,{
            method : 'POST',
            body : formDataImg

        });

        if(!resp.ok) throw new Error('ERROR no se pudo cargar la imagen al servidor');

        let result = await resp.json();


        return{
            ok: true,
            secure_url : result.secure_url
        }
    
        
    } catch (error) {

        console.log(error);

        return {
            ok: false,
            messageError : error.message
        }
        
    }

}