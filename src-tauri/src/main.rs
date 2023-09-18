// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod files;
mod project;

use files::list_files_from_path;
use project::load_project;
use project::save_new_script;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            list_files_from_path,
            load_project,
            save_new_script
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
