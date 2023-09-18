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