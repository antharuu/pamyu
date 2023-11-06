extern crate walkdir;

use walkdir::WalkDir;
use tauri::command;
use crate::project::{get_valid_path, is_game_project};

#[command]
pub fn get_all_project_renpy_files(path: String) -> Result<Vec<String>, String> {
    let path = get_valid_path(path);
    if !is_game_project(&path) {
        return Err(format!("This is not a Ren'Py project. - Not found game directory\n\nPath: {}", path));
    }
    let game_path = format!("{}/game", path);

    let mut rpy_files = Vec::new();
    for entry in WalkDir::new(&game_path) {
        let entry = match entry {
            Ok(entry) => entry,
            Err(err) => return Err(format!("Error walking the directory: {}", err)),
        };
        if entry.file_type().is_file() && entry.path().extension().map_or(false, |ext| ext == "rpy") {
            rpy_files.push(entry.path().display().to_string());
        }
    }

    Ok(rpy_files)
}
