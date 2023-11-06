#[tauri::command]
pub fn list_files_from_path(path: String) -> Result<Vec<String>, String> {
    let mut files: Vec<String> = Vec::new();

    // Gérer l'erreur si le chemin est invalide
    let paths = match std::fs::read_dir(&path) {
        Ok(p) => p,
        Err(e) => return Err(format!("Erreur en lisant le dossier : {}", e)),
    };

    for path_result in paths {
        match path_result {
            Ok(entry) => {
                let path = entry.path();
                if let Some(path_str) = path.to_str() {
                    files.push(path_str.to_string());
                } else {
                    // Gérer le cas où le chemin n'est pas convertible en chaîne de caractères
                    return Err(format!("Le chemin {} n'est pas valide.", path.display()));
                }
            }
            Err(e) => {
                // Gérer les erreurs lors de l'itération sur les chemins
                return Err(format!("Erreur en parcourant le dossier : {}", e));
            }
        }
    }

    Ok(files)
}

#[tauri::command]
pub fn delete_file(path: String) -> Result<bool, String> {
    // Gérer l'erreur si le chemin est invalide
    let path = match std::fs::canonicalize(&path) {
        Ok(p) => p,
        Err(e) => return Err(format!("Erreur en lisant le dossier : {}", e)),
    };

    // Vérifier que le chemin est bien un fichier
    if !path.is_file() {
        return Err(format!("Le chemin {} n'est pas un fichier.", path.display()));
    }

    // Supprimer le fichier
    match std::fs::remove_file(&path) {
        Ok(_) => Ok(true),
        Err(e) => Err(format!("Erreur en supprimant le fichier : {}", e)),
    }
}