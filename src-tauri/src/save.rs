use std::fs;
use std::path::Path;
use std::io::{Write, Read};

#[tauri::command]
pub fn save_data(path: String, data: String) -> Result<(), String> {
    // Créer le dossier si il n'existe pas
    let folder_path = Path::new(&path).join(".pamyu");
    if !folder_path.exists() {
        fs::create_dir_all(&folder_path).map_err(|err| err.to_string())?;
    }

    // Chemin complet du fichier
    let file_path = folder_path.join("config.json");

    // Écrire les données dans le fichier
    fs::write(&file_path, data).map_err(|err| err.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn load_data(path: String) -> Result<String, String> {
    let folder_path = Path::new(&path).join(".pamyu");
    let file_path = folder_path.join("config.json");

    if file_path.exists() {
        let mut file = fs::File::open(&file_path).map_err(|err| err.to_string())?;
        let mut contents = String::new();
        file.read_to_string(&mut contents).map_err(|err| err.to_string())?;
        Ok(contents)
    } else {
        Ok("{}".to_string())  // Renvoyer une chaîne JSON vide si le fichier n'existe pas
    }
}
