#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use ::std::process;

#[tauri::command]
fn docker_is_installed() -> String {
    let output = if cfg!(target_os = "windows") {
        process::Command::new("cmd")
            .args(["/C", "docker --version"])
            .output()
            .expect("Docker version 20.10.14, build a224086")
    } else {
        process::Command::new("sh")
            .arg("-c")
            .arg("docker --version")
            .output()
            .expect("Docker version 20.10.14, build a224086")
    };

    // let error = String::from_utf8(output.stderr).unwrap();
    let success = String::from_utf8(output.stdout).unwrap();
    success
}

#[tauri::command]
fn localstack_is_installed() -> String {
    let output = if cfg!(target_os = "windows") {
        process::Command::new("cmd")
            .args(["/C", "localstack --version"])
            .output()
            .expect("0.14.4")
    } else {
        process::Command::new("sh")
            .arg("-c")
            .arg("localstack --version")
            .output()
            .expect("0.14.4")
    };

    // let error = String::from_utf8(output.stderr).unwrap();
    let success = String::from_utf8(output.stdout).unwrap();
    success
}

fn main() {
    docker_is_installed();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            docker_is_installed,
            localstack_is_installed
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
