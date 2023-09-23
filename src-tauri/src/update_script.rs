use std::fs;
use std::path::Path;
use crate::project::{get_valid_path, is_game_project};

#[tauri::command]
pub fn update_data(path: String, file: String, data: String) -> Result<(), String> {
    let path = get_valid_path(path);

    // If it's a Ren'Py project
    if is_game_project(&path) {
        let script_path = format!("{}/game/{}", path, file);
        return if std::path::Path::new(&script_path).exists() {
            // return the content of the script.rpy file
            match fs::write(&script_path, data) {
                Ok(_) => Ok(()),
                Err(_) => Err(format!("Unable to write game/script.rpy file.\n\nPath: {}", path)),
            }
        } else {
            Err(format!("game/script.rpy not found in the Ren'Py project.\n\nPath: {}", path))
        };
    }

    Err(format!("This is not a Ren'Py project. - Not found game directory\n\nPath: {}", path))
}