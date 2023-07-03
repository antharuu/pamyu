// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
async fn save(version: String, value: i32) -> bool {
    println!("The version is {} and the value is {}", version, value);

    use std::fs::OpenOptions;
    use std::io::Write;
    use std::path::Path;

    let path = Path::new("data/save.json");
    let display = path.display();

    let mut file = match OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open(&path)
    {
        Err(why) => panic!("Couldn't open {}: {}", display, why.to_string()),
        Ok(file) => file,
    };

    if !path.exists() {
        match file.write_all(b"{}") {
            Err(why) => panic!("Couldn't write to {}: {}", display, why.to_string()),
            Ok(_) => println!("Successfully wrote to {}", display),
        };
    }

    false
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
