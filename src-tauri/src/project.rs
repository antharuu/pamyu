use std::fs;

#[tauri::command]
pub fn load_project(path: String) -> Result<String, String> {
    let path = get_valid_path(path);

    // If it's a Ren'Py project
    if is_game_project(&path) {
        let script_path = format!("{}/game/script.rpy", path);
        return if std::path::Path::new(&script_path).exists() {
            // return the content of the script.rpy file
            match fs::read_to_string(&script_path) {
                Ok(content) => Ok(content),
                Err(_) => Err(format!("Unable to read game/script.rpy file.\n\nPath: {}", path)),
            }
        } else {
            Err(format!("game/script.rpy not found in the Ren'Py project.\n\nPath: {}", path))
        };
    }

    Err(format!("This is not a Ren'Py project. - Not found game directory\n\nPath: {}", path))
}

#[tauri::command]
pub fn save_new_script(path: String, content: String) -> Result<(), String> {
    let path = get_valid_path(path);

    // If it's a Ren'Py project
    if is_game_project(&path) {
        let script_path = format!("{}/game/script.rpy", path);
        return if std::path::Path::new(&script_path).exists() {
            // return the content of the script.rpy file
            match fs::write(&script_path, content) {
                Ok(_) => Ok(()),
                Err(_) => Err(format!("Unable to write game/script.rpy file.\n\nPath: {}", path)),
            }
        } else {
            Err(format!("game/script.rpy not found in the Ren'Py project.\n\nPath: {}", path))
        };
    }

    Err(format!("This is not a Ren'Py project. - Not found game directory\n\nPath: {}", path))
}

pub fn get_valid_path(path: String) -> String {
    if path.ends_with("/") {
        // remove last char
        path[..path.len() - 1].to_string()
    } else {
        path
    }
}

pub fn is_game_project(path: &String) -> bool {
    let game_path = format!("{}/game", path);
    match fs::metadata(&game_path) {
        Ok(metadata) => metadata.is_dir(),
        Err(_) => false,
    }
}